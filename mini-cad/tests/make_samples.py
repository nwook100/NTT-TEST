"""샘플 DXF 생성: python3 mini-cad/tests/make_samples.py  (pip install ezdxf)"""
import os
import ezdxf

OUT = os.path.join(os.path.dirname(__file__), "samples")
os.makedirs(OUT, exist_ok=True)

for ver, name, enc in [("R2000", "sample_r2000_cp949.dxf", "cp949"), ("R2018", "sample_r2018.dxf", "utf-8")]:
    d = ezdxf.new(ver, setup=True)
    d.header["$INSUNITS"] = 4  # mm
    m = d.modelspace()
    m.add_lwpolyline([(0, 0, 0, 0, 0), (100, 0, 0, 0, 0.5), (100, 60), (0, 60)], format="xyseb", close=True)
    m.add_circle((30, 30), 10)
    m.add_arc((70, 30), 12, 0, 180)
    m.add_text("매거진 도면", dxfattribs={"height": 5}).set_placement((0, 70))
    m.add_mtext("카세트\\P2줄째", dxfattribs={"char_height": 4, "insert": (0, -10)})
    b = d.blocks.new("HOLE")
    b.add_circle((0, 0), 3)
    b.add_line((-4, 0), (4, 0))
    m.add_blockref("HOLE", (20, 10), dxfattribs={"rotation": 30})
    ins = m.add_blockref("HOLE", (10, 50))
    ins.dxf.column_count = 5
    ins.dxf.column_spacing = 10
    m.add_linear_dim(base=(0, -20), p1=(0, 0), p2=(100, 0), dimstyle="EZDXF").render()
    m.add_ellipse((150, 30), major_axis=(20, 0), ratio=0.5)
    m.add_solid([(120, 0), (130, 0), (120, 10), (130, 10)])
    d.saveas(os.path.join(OUT, name), encoding=enc)
    print("wrote", name)
