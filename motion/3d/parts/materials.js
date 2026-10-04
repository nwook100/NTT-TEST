/* 공용 재질 팩토리. 모든 부품은 여기서 재질을 가져다 쓴다(일관된 색/질감). 필요하면 .clone() 후 수정. */
window.MAT = {
  alu:          () => new THREE.MeshStandardMaterial({ color: 0xc9ced4, metalness: 0.7,  roughness: 0.38 }), // 은색 아노다이징 알루미늄
  aluBright:    () => new THREE.MeshStandardMaterial({ color: 0xdfe3e7, metalness: 0.75, roughness: 0.3  }), // 밝은 알루미늄(기계 가공면)
  aluDark:      () => new THREE.MeshStandardMaterial({ color: 0x4b5157, metalness: 0.6,  roughness: 0.45 }), // 하드 아노다이징(짙은 회색)
  aluRed:       () => new THREE.MeshStandardMaterial({ color: 0xb0202c, metalness: 0.55, roughness: 0.42 }), // 빨강 아노다이징
  aluBlue:      () => new THREE.MeshStandardMaterial({ color: 0x3f7fb5, metalness: 0.55, roughness: 0.42 }), // 파랑 아노다이징
  aluGold:      () => new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.6,  roughness: 0.4  }), // 금색 아노다이징
  sus:          () => new THREE.MeshStandardMaterial({ color: 0xb8bdc3, metalness: 0.95, roughness: 0.22 }), // SUS 420J2 (스테인리스)
  nickel:       () => new THREE.MeshStandardMaterial({ color: 0xd2d5d8, metalness: 0.9,  roughness: 0.3  }), // 무전해 니켈 도금
  plasticBlack: () => new THREE.MeshStandardMaterial({ color: 0x1b1d20, metalness: 0.1,  roughness: 0.6  }), // 검정 플라스틱(전도성)
  plasticWhite: () => new THREE.MeshStandardMaterial({ color: 0xe6e6e3, metalness: 0.05, roughness: 0.55 }), // 흰색/상아색 플라스틱
  waferTape:    () => new THREE.MeshStandardMaterial({ color: 0xc98a3c, metalness: 0.2,  roughness: 0.45 }), // 테이프 위 웨이퍼(사진에서 주황빛)
  waferSi:      () => new THREE.MeshStandardMaterial({ color: 0x4a5566, metalness: 0.85, roughness: 0.2  }), // 실리콘 웨이퍼 면
  pcbGreen:     () => new THREE.MeshStandardMaterial({ color: 0x2e7a4b, metalness: 0.1,  roughness: 0.5  }), // 기판(녹색)
  copper:       () => new THREE.MeshStandardMaterial({ color: 0xd89a5a, metalness: 0.9,  roughness: 0.3  }), // 구리 리드프레임
  rubberBlack:  () => new THREE.MeshStandardMaterial({ color: 0x111214, metalness: 0.0,  roughness: 0.9  }), // 고무/우레탄 패드
};
