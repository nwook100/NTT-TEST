/* 독이 든 성배 — 추가 이벤트 카드 (시나리오 작가) */
window.EXTRA_EVENTS = [
  { id: 'chant', title: '응원가 저작권', who: '응원단장',
    text: '원곡 작곡가가 우리 응원가에 저작권료를 청구했다. 응원단장은 "가사만 바꾸면 남의 노래 아니다"라고 우긴다.',
    choices: [
      { label: '저작권료를 낸다', fx: { budget: -4, fans: 5, morale: 2 } },
      { label: '개사해서 부른다', fx: { fans: -6, trust: 3, morale: -1 } }
    ] },
  { id: 'remodel', title: '홈런 공장 공사', who: '구단주 비서',
    text: '구단주가 펜스를 5m 당겨 "홈런 공장"을 만들자고 한다. 공사비는 당연히 감독 예산에서.',
    choices: [
      { label: '펜스를 당긴다', fx: { budget: -10, bat: 5, pit: -3, trust: 4 } },
      { label: '투수들이 운다고 말린다', fx: { trust: -6, pit: 2, morale: 3 } }
    ] },
  { id: 'fixing', title: '승부조작 제보', who: '익명 제보자',
    text: '불펜 투수 한 명이 브로커와 접촉했다는 제보가 왔다. 사실이라면 이건 야구가 아니라 범죄다.',
    when: function (s) { return s.week >= 4; },
    choices: [
      { label: '리그 사무국에 신고', fx: { trust: -6, fans: 6, morale: -3, pit: -2 } },
      { label: '구단 자체 조사부터', fx: { trust: 5, fans: -6, morale: -3 } }
    ] },
  { id: 'shave', title: '삭발 투혼', who: '주장',
    text: '연패가 길어지자 주장이 전원 삭발을 제안했다. "감독님도 같이 미셔야 진정성이 삽니다."',
    when: function (s) { return s.week >= 3 && s.losses > s.wins; },
    choices: [
      { label: '바리캉을 직접 든다', fx: { morale: 6, fans: 5, boost: 3, trust: -2 } },
      { label: '머리로 야구하냐고 한다', fx: { morale: -5, trust: 3, def: 2 } }
    ] },
  { id: 'homesick', title: '외인 향수병', who: '외국인 타자',
    text: '외국인 타자가 고향 음식이 그립다며 사흘째 스윙을 안 한다. 통역은 "어머니 손맛 결핍"이라고 진단했다.',
    when: function (s) { return s.week >= 3; },
    choices: [
      { label: '어머니를 모셔온다', fx: { budget: -4, bat: 4, morale: 3 } },
      { label: '반월 국밥으로 달랜다', fx: { bat: -3, morale: 2, fans: 4 } }
    ] },
  { id: 'firstpitch', title: '시구자 논란', who: '마케팅팀',
    text: '마케팅팀이 논란 중인 연예인을 시구자로 섭외했다. 검색어 1위 확정, 욕도 1위 확정.',
    choices: [
      { label: '그대로 진행한다', fx: { budget: 4, trust: 4, fans: -6 } },
      { label: '리틀야구 소녀로 교체', fx: { fans: 7, trust: -4, morale: 2 } }
    ] },
  { id: 'signs', title: '사인 훔치기 의혹', who: '상대팀 감독',
    text: '상대 감독이 외야 카메라로 사인을 훔친다고 주장한다. 사실 그 카메라는 구단주가 몰래 달았다.',
    choices: [
      { label: '카메라를 떼어낸다', fx: { trust: -6, fans: 4, morale: 2 } },
      { label: '"그거 방범용 CCTV"', fx: { trust: 4, fans: -5, boost: 3 } }
    ] },
  { id: 'captain', title: '주장 교체론', who: '라커룸',
    text: '주장이 타율 1할대에 빠지자 젊은 선수들이 완장 교체를 요구한다. 베테랑들은 팔짱을 꼈다.',
    choices: [
      { label: '젊은 피에게 완장을', fx: { fans: 4, bat: 3, morale: -5 } },
      { label: '베테랑을 믿는다', fx: { morale: 3, trust: 2, fans: -4, bat: -2 } }
    ] },
  { id: 'farewell', title: '은퇴 투어', who: '원클럽맨 노장',
    text: '20년 원클럽맨 노장이 은퇴 투어를 원한다. 원정 구장마다 꽃다발, 그리고 매 경기 선발 출전.',
    when: function (s) { return s.week >= 10; },
    choices: [
      { label: '매 경기 선발로 낸다', fx: { fans: 8, morale: 4, bat: -4, def: -2 } },
      { label: '대타로만 기용한다', fx: { bat: 2, trust: 3, fans: -6, morale: -3 } }
    ] },
  { id: 'factory', title: '공단 단체관람', who: '반월공단 노조',
    text: '반월공단 노동자 3천 명이 단체관람을 신청했다. 문제는 그게 구단주 회사 공장 노조라는 것.',
    choices: [
      { label: '외야석을 통째로 연다', fx: { fans: 9, morale: 2, trust: -7 } },
      { label: '"좌석이 매진됐다"', fx: { trust: 5, fans: -7, morale: -2 } }
    ] },
  { id: 'wedding', title: '도련님 결혼식', who: '구단주 비서',
    text: '구단주 아들 결혼식이 경기 날과 겹쳤다. 선수단 전원 하객 참석, 축가는 4번 타자 솔로.',
    choices: [
      { label: '선수단 축가 출동', fx: { trust: 8, morale: -4, boost: -3 } },
      { label: '경기가 먼저입니다', fx: { trust: -7, morale: 4, boost: 2 } }
    ] },
  { id: 'heat', title: '폭염 낮경기', who: '중계방송사',
    text: '방송사가 편성을 이유로 낮 2시 경기를 요구한다. 체감온도 38도, 인조잔디는 프라이팬이다.',
    when: function (s) { return s.week >= 6 && s.week <= 12; },
    choices: [
      { label: '중계권료를 챙긴다', fx: { budget: 5, morale: -5, def: -2 } },
      { label: '야간경기를 고집한다', fx: { trust: -4, morale: 4, fans: 2 } }
    ] },
  { id: 'family', title: '딸의 학예회', who: '감독 딸',
    text: '딸이 학교에서 "꼴찌 감독 딸"이라 놀림받고 울었다. 오늘은 딸의 학예회, 그리고 특타 훈련 날.',
    choices: [
      { label: '학예회에 간다', fx: { fans: 4, morale: 2, trust: -4, bat: -2 } },
      { label: '구장으로 출근한다', fx: { trust: 3, boost: 3, morale: -2, fans: -2 } }
    ] },
  { id: 'pundit', title: '해설위원 독설', who: '중계석',
    text: '전설의 해설위원이 생방송에서 말했다. "이 팀은 야구가 아니라 행위예술을 합니다."',
    choices: [
      { label: '기자회견으로 반박', fx: { fans: 5, morale: 4, trust: -5 } },
      { label: '독설을 수비 교재로', fx: { def: 3, morale: -4, fans: -2, trust: 2 } }
    ] },
  { id: 'goods', title: '연패 수건 완판', who: '구단 매점',
    text: '연패를 비꼰 "오늘도 수고했어" 수건이 밈이 되어 완판됐다. 선수들은 그 수건으로 눈물을 닦는다.',
    when: function (s) { return s.losses >= 6; },
    choices: [
      { label: '대량 재생산한다', fx: { budget: 6, fans: 3, morale: -5 } },
      { label: '선수 자존심을 지킨다', fx: { morale: 4, trust: -3, fans: -3 } }
    ] },
  { id: 'shaman', title: '3루에 낀 살', who: '구단주 지인',
    text: '구단주가 용하다는 무속인을 데려왔다. "3루 베이스에 살이 꼈다"며 경기 전 굿을 하자고 한다.',
    choices: [
      { label: '굿판을 벌인다', fx: { budget: -3, trust: 6, morale: 2, fans: -4 } },
      { label: '과학을 믿는다', fx: { trust: -6, fans: 4, def: 1 } }
    ] },
  { id: 'karaoke', title: '새벽 노래방 라방', who: '구단 홍보팀',
    text: '주전 유격수가 새벽 3시 노래방 라이브 방송을 켰다. 다음 날 실책 3개, 댓글 3천 개.',
    choices: [
      { label: '2군으로 보낸다', fx: { fans: 6, trust: 2, def: -3, morale: -3 } },
      { label: '감싸 안는다', fx: { morale: 4, def: 2, fans: -6 } }
    ] },
  { id: 'beer', title: '맥주 9천 원', who: '구장 매점',
    text: '구단주가 구장 맥주 값을 9천 원으로 올리겠다고 한다. "어차피 맨정신으로 못 보는 경기잖아?"',
    choices: [
      { label: '찬성한다', fx: { budget: 6, trust: 3, fans: -7 } },
      { label: '팬 편에 선다', fx: { trust: -5, fans: 6 } }
    ] },
  { id: 'bus', title: '원정버스 고장', who: '고속도로 갓길',
    text: '원정 버스가 고속도로에서 퍼졌다. 구단주 문자: "걸어가도 하체 운동이다."',
    choices: [
      { label: '택시 30대를 부른다', fx: { budget: -4, morale: 3, boost: 2 } },
      { label: '히치하이킹 투혼', fx: { fans: 6, morale: -4, boost: -2 } }
    ] },
  { id: 'ailineup', title: 'AI 라인업', who: '구단주 태블릿',
    text: '구단주가 AI가 짰다는 라인업을 보냈다. 1번 타자 포수, 4번 타자 마무리 투수.',
    when: function (s) { return s.week >= 2; },
    choices: [
      { label: '하루만 써 본다', fx: { trust: 7, bat: -4, morale: -3 } },
      { label: '"서버 점검 중"이라 한다', fx: { trust: -6, bat: 2, morale: 2 } }
    ] },
  { id: 'magic', title: '매직넘버 등장', who: '스포츠신문',
    text: '신문에 우리 팀 매직넘버가 실렸다. 구단주는 벌써 우승 반지 디자인 시안을 고르는 중이다.',
    when: function (s) { return s.week >= 10 && s.rank <= 6; },
    choices: [
      { label: '"가을야구 간다" 선언', fx: { fans: 6, trust: 5, morale: -2, promise: true } },
      { label: '"아직 멀었다" 자제', fx: { morale: 3, def: 2, trust: -4, fans: -2 } }
    ] },
  { id: 'tank', title: '전략적 패배론', who: '스카우트 팀장',
    text: '스카우트 팀장이 속삭인다. "어차피 꼴찌면 신인 1순위라도 챙기시죠." 그는 진지했다.',
    when: function (s) { return s.week >= 11 && s.rank >= 8; },
    choices: [
      { label: '끝까지 전력을 다한다', fx: { boost: 4, fans: 3, morale: -4, trust: -2 } },
      { label: '주전에게 휴식을 준다', fx: { morale: 6, pit: 2, boost: -5, fans: -4 } }
    ] },
  { id: 'resign', title: '빈 사직서', who: '감독실 책상',
    text: '비서가 빈 사직서 양식을 책상에 두고 갔다. "미리 드리는 겁니다. 서명은 천천히 하세요."',
    when: function (s) { return s.trust < 25; },
    choices: [
      { label: '찢어서 반송한다', fx: { trust: -3, morale: 6, fans: 4 } },
      { label: '구단주실에 찾아간다', fx: { trust: 8, morale: -6, fans: -3 } }
    ] },
  { id: 'scapegoat', title: '희생양 구함', who: '구단주',
    text: '구단주가 "누군가는 책임져야지"라며 수석코치 경질을 요구한다. 그는 당신의 30년 지기다.',
    when: function (s) { return s.trust < 25; },
    choices: [
      { label: '코치를 내보낸다', fx: { trust: 9, morale: -6, def: -2 } },
      { label: '"차라리 저를 자르시죠"', fx: { trust: -4, morale: 8, fans: 4 } }
    ] }
];
