# Synthesizes the channel's sound effects and a dark ambient music bed with ffmpeg (no samples, no licenses needed).
# Usage: python3 sfx.py <out_dir>            -> writes whoosh/impact/riser/heartbeat/typewriter/stamp/glitch .wav
#        python3 sfx.py --bed <seconds> <wav>  -> writes a seamless-enough drone bed of the given length
import subprocess, sys, os

SR = 48000
SFX = {
    # filtered pink-noise swell
    "whoosh": ["-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.6:d=1.1",
               "-af", "bandpass=f=900:width_type=o:w=2.5,afade=t=in:d=0.45,afade=t=out:st=0.5:d=0.6,volume=1.6"],
    # falling sub thump + noise crack
    "impact": ["-f", "lavfi", "-i", "aevalsrc='0.95*sin(2*PI*(42+90*exp(-9*t))*t)*exp(-3.2*t)':d=1.6",
               "-f", "lavfi", "-i", "anoisesrc=color=brown:amplitude=0.9:d=0.25",
               "-filter_complex", "[1]lowpass=f=900,afade=t=out:d=0.25[n];[0][n]amix=inputs=2:normalize=0,volume=1.2"],
    # rising tone + noise, 2.5 s
    "riser": ["-f", "lavfi", "-i", "aevalsrc='0.35*sin(2*PI*(180*t+170*t*t))*(t/2.5)':d=2.5",
              "-f", "lavfi", "-i", "anoisesrc=color=white:amplitude=0.25:d=2.5",
              "-filter_complex", "[1]highpass=f=1500,volume='t/2.5':eval=frame[n];[0][n]amix=inputs=2:normalize=0,afade=t=out:st=2.35:d=0.15"],
    # two low thumps per beat, ~66 bpm, 3 beats
    "heartbeat": ["-f", "lavfi", "-i",
                  "aevalsrc='0.9*sin(2*PI*52*t)*(exp(-28*mod(t,0.9))+0.65*exp(-28*mod(t-0.24,0.9))*gte(mod(t,0.9),0.24))':d=2.7",
                  "-af", "lowpass=f=160,volume=1.8"],
    # mechanical clicks
    "typewriter": ["-f", "lavfi", "-i", "aevalsrc='(random(0)*2-1)*exp(-260*mod(t,0.105))*0.7':d=1.6",
                   "-af", "highpass=f=1800,volume=1.4"],
    # short heavy thud for stamps
    "stamp": ["-f", "lavfi", "-i", "aevalsrc='0.9*sin(2*PI*(60+120*exp(-25*t))*t)*exp(-9*t)':d=0.7",
              "-f", "lavfi", "-i", "anoisesrc=color=brown:amplitude=1:d=0.12",
              "-filter_complex", "[1]lowpass=f=1200[n];[0][n]amix=inputs=2:normalize=0,volume=1.3"],
    # digital stutter
    "glitch": ["-f", "lavfi", "-i", "anoisesrc=color=white:amplitude=0.7:d=0.5",
               "-af", "tremolo=f=19:d=1,acrusher=bits=5:mode=lin:samples=8,highpass=f=700,afade=t=out:st=0.4:d=0.1,volume=1.3"],
}


def make_sfx(out):
    os.makedirs(out, exist_ok=True)
    for name, args in SFX.items():
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args, "-ar", str(SR), "-ac", "2",
                        os.path.join(out, name + ".wav")], check=True)
        print("sfx", name)


def make_bed(seconds, path):
    # three detuned low sines with slow, unsynchronised swells + filtered brown noise + a little echo
    expr = ("0.22*sin(2*PI*55*t)*(0.55+0.45*sin(2*PI*0.031*t))"
            "+0.16*sin(2*PI*82.4*t)*(0.55+0.45*sin(2*PI*0.023*t+1.3))"
            "+0.09*sin(2*PI*110.3*t)*(0.5+0.5*sin(2*PI*0.017*t+2.1))"
            "+0.05*sin(2*PI*164.8*t)*(0.5+0.5*sin(2*PI*0.041*t+0.7))")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error",
                    "-f", "lavfi", "-i", f"aevalsrc='{expr}':s={SR}:d={seconds}",
                    "-f", "lavfi", "-i", f"anoisesrc=color=brown:amplitude=0.08:d={seconds}:r={SR}",
                    "-filter_complex", "[1]lowpass=f=350[n];[0][n]amix=inputs=2:normalize=0,"
                    "aecho=0.8:0.7:420|780:0.25|0.18,afade=t=in:d=4,"
                    f"afade=t=out:st={max(0, seconds - 5)}:d=5",
                    "-ac", "2", path], check=True)


if __name__ == "__main__":
    if sys.argv[1] == "--bed":
        make_bed(float(sys.argv[2]), sys.argv[3])
    else:
        make_sfx(sys.argv[1])
