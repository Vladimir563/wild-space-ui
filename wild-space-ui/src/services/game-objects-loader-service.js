import { Vector2 } from '../services/sprite-service';

export class GameObjectsLoaderService {
    loadGameObjects = () => {
        return [
            { position: new Vector2(890, 250), frameSize: new Vector2(70, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 1, name: "Computer" },
            { position: new Vector2(690, 200), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 1, animationInterval: 80, enableAnimation: false, name: "ClrPet" }
        ];
    }

    loadGroundWalls = (horizontalOffset = 0, verticalOffset = 0) => {
        const color = "green";
        return [
            // загружаем стены (левая вертикальная граница)
            { position: new Vector2(660 + horizontalOffset, 375 + verticalOffset), frameSize: new Vector2(10, 95), bgColor:color},
            { position: new Vector2(565 + horizontalOffset, 65 + verticalOffset), frameSize: new Vector2(10, 315), bgColor:color},
            { position: new Vector2(595 + horizontalOffset, 470 + verticalOffset), frameSize: new Vector2(10, 120), bgColor:color},
            { position: new Vector2(520 + horizontalOffset, 590 + verticalOffset), frameSize: new Vector2(10, 190), bgColor:color},
            { position: new Vector2(550 + horizontalOffset, 775 + verticalOffset), frameSize: new Vector2(10, 70), bgColor:color},
            // // загружаем стены (левая горизонтальная граница)
            { position: new Vector2(565 + horizontalOffset, 370 + verticalOffset), frameSize: new Vector2(105, 10), bgColor:color},
            { position: new Vector2(520 + horizontalOffset, 580 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            { position: new Vector2(595 + horizontalOffset, 460 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(520 + horizontalOffset, 775 + verticalOffset), frameSize: new Vector2(35, 10), bgColor:color},
            // // загружаем стены (верхняя горизонтальная граница)
            { position: new Vector2(565 + horizontalOffset, 55 + verticalOffset), frameSize: new Vector2(250, 10), bgColor:color},
            { position: new Vector2(815 + horizontalOffset, 85 + verticalOffset), frameSize: new Vector2(175, 10), bgColor:color},
            { position: new Vector2(990 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(300, 10), bgColor:color},
            { position: new Vector2(1290 + horizontalOffset, 90 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            // // загружаем стены (верхняя вертикальная граница)
            { position: new Vector2(815 + horizontalOffset, 55 + verticalOffset), frameSize: new Vector2(10, 30), bgColor:color},
            { position: new Vector2(980 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(10, 40), bgColor:color},
            { position: new Vector2(1290 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(10, 50), bgColor:color},
            // // загружаем стены (нижняя горизонтальная граница)
            { position: new Vector2(550 + horizontalOffset, 840 + verticalOffset), frameSize: new Vector2(100, 10), bgColor:color},
            { position: new Vector2(645 + horizontalOffset, 770 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(720 + horizontalOffset, 745 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(790 + horizontalOffset, 860 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
            { position: new Vector2(875 + horizontalOffset, 845 + verticalOffset), frameSize: new Vector2(265, 10), bgColor:color},
            { position: new Vector2(1140 + horizontalOffset, 795 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(1210 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            { position: new Vector2(1285 + horizontalOffset, 695 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
            // // загружаем стены (нижняя вертикальная граница)
            { position: new Vector2(645 + horizontalOffset, 770 + verticalOffset), frameSize: new Vector2(10, 80), bgColor:color},
            { position: new Vector2(715 + horizontalOffset, 745 + verticalOffset), frameSize: new Vector2(10, 35), bgColor:color},
            { position: new Vector2(780 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(10, 120), bgColor:color},
            { position: new Vector2(870 + horizontalOffset, 845 + verticalOffset), frameSize: new Vector2(10, 25), bgColor:color},
            { position: new Vector2(1140 + horizontalOffset, 795 + verticalOffset), frameSize: new Vector2(10, 60), bgColor:color},
            { position: new Vector2(1210 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(10, 55), bgColor:color},
            { position: new Vector2(1285 + horizontalOffset, 695 + verticalOffset), frameSize: new Vector2(10, 65), bgColor:color},
            // // загружаем стены (правая вертикальная граница)
            { position: new Vector2(1360 + horizontalOffset, 465 + verticalOffset), frameSize: new Vector2(10, 230), bgColor:color},
            { position: new Vector2(1285 + horizontalOffset, 195+ verticalOffset), frameSize: new Vector2(10, 280), bgColor:color},
            { position: new Vector2(1360 + horizontalOffset, 90 + verticalOffset), frameSize: new Vector2(10, 110), bgColor:color},
            // // загружаем стены (правая горизонтальная граница)
            { position: new Vector2(1290 + horizontalOffset, 465 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            { position: new Vector2(1285 + horizontalOffset, 190 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
        ];
    }
}