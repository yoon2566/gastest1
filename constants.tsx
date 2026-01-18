
import { Level, LevelType } from './types';

export const LEVELS: Level[] = [
  {
    id: 0,
    title: "습격받은 마우스 숲",
    description: "장난꾸러기 바이러스들이 숲의 정령들을 괴롭히고 있어요! 마법 클릭으로 모두 정화하세요.",
    type: LevelType.MOUSE_CLICK,
    instructions: "날아다니는 바이러스를 신속하게 클릭하여 퇴치하세요!"
  },
  {
    id: 1,
    title: "한글 문자 산맥",
    description: "산맥의 방어 장치가 고장 났어요. 떨어지는 한글 마법 문자를 입력해 방벽을 세우세요!",
    type: LevelType.KEYBOARD_KR,
    instructions: "하늘에서 떨어지는 한글 자모음을 정확하게 타이핑하세요.",
    lang: 'KR'
  },
  {
    id: 2,
    title: "알파벳 우주 통로",
    description: "우주 통로가 알파벳 운석으로 막혔습니다! 영어 타격으로 통로를 확보하세요.",
    type: LevelType.KEYBOARD_EN,
    instructions: "알파벳 운석이 바닥에 닿기 전에 입력하여 파괴하세요.",
    lang: 'EN'
  },
  {
    id: 3,
    title: "복사의 정원",
    description: "정화의 사과가 더 많이 필요해요. 복사와 붙여넣기 연금술로 사과를 무한 증식시키세요!",
    type: LevelType.CLIPBOARD,
    instructions: "마법 주문(사과나무)을 복사하고 대지에 5번 붙여넣으세요."
  },
  {
    id: 4,
    title: "잊혀진 금고의 성",
    description: "성 깊숙한 곳, 잃어버린 '전설의 마스터 칩'이 잠들어 있습니다. 폴더 미로를 돌파하세요.",
    type: LevelType.FILE_SYSTEM,
    instructions: "미로 같은 폴더들을 탐험하여 숨겨진 보물을 찾아내세요."
  },
  {
    id: 5,
    title: "최종 결전: 예절의 수호자",
    description: "다크 바이러스가 왕국을 오염시키려 합니다. 올바른 행동을 선택해 왕국을 정화하세요!",
    type: LevelType.ETIQUETTE,
    instructions: "바이러스의 유혹에 맞서 바른 행동(😊)과 나쁜 행동(😡)을 구분하세요."
  }
];
