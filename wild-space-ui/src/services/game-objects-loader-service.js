import { Vector2 } from '../services/sprite-service';

export class GameObjectsLoaderService {
    loadGameObjects = () => {
        return [
            { position: new Vector2(200, 100), frameSize: new Vector2(70, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 0.5, name: "Computer" },
            { position: new Vector2(150, 30), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 0.7, animationInterval: 80, enableAnimation: true, name: "ClrPet" }
        ];
    }

    loadGroundWalls = () => {
        const color = "green";
        return [
            // загружаем стены (левая вертикальная граница)
            { position: new Vector2(106, 75), frameSize: new Vector2(10, 93), scale:0.5, bgColor:color},
            { position: new Vector2(84, 4), frameSize: new Vector2(10, 285), scale:0.5, bgColor:color},
            { position: new Vector2(91, 97), frameSize: new Vector2(10, 110), scale:0.5, bgColor:color},
            { position: new Vector2(74, 125), frameSize: new Vector2(10, 170), scale:0.5, bgColor:color},
            { position: new Vector2(81, 168), frameSize: new Vector2(10, 65), scale:0.5, bgColor:color},
            // загружаем стены (левая горизонтальная граница)
            { position: new Vector2(84, 74), frameSize: new Vector2(100, 10), scale:0.5, bgColor:color},
            { position: new Vector2(91, 95), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            { position: new Vector2(74, 122), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            { position: new Vector2(74, 166), frameSize: new Vector2(40, 10), scale:0.5, bgColor:color},
            // // // загружаем стены (верхняя горизонтальная граница)
            // { position: new Vector2(565 + horizontalOffset, 55 + verticalOffset), frameSize: new Vector2(250, 10), bgColor:color},
            // { position: new Vector2(815 + horizontalOffset, 85 + verticalOffset), frameSize: new Vector2(175, 10), bgColor:color},
            // { position: new Vector2(990 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(300, 10), bgColor:color},
            // { position: new Vector2(1290 + horizontalOffset, 90 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            // // // загружаем стены (верхняя вертикальная граница)
            // { position: new Vector2(815 + horizontalOffset, 55 + verticalOffset), frameSize: new Vector2(10, 30), bgColor:color},
            // { position: new Vector2(980 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(10, 40), bgColor:color},
            // { position: new Vector2(1290 + horizontalOffset, 45 + verticalOffset), frameSize: new Vector2(10, 50), bgColor:color},
            // // // загружаем стены (нижняя горизонтальная граница)
            // { position: new Vector2(550 + horizontalOffset, 840 + verticalOffset), frameSize: new Vector2(100, 10), bgColor:color},
            // { position: new Vector2(645 + horizontalOffset, 770 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            // { position: new Vector2(720 + horizontalOffset, 745 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            // { position: new Vector2(790 + horizontalOffset, 860 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
            // { position: new Vector2(875 + horizontalOffset, 845 + verticalOffset), frameSize: new Vector2(265, 10), bgColor:color},
            // { position: new Vector2(1140 + horizontalOffset, 795 + verticalOffset), frameSize: new Vector2(70, 10), bgColor:color},
            // { position: new Vector2(1210 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            // { position: new Vector2(1285 + horizontalOffset, 695 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
            // // // загружаем стены (нижняя вертикальная граница)
            // { position: new Vector2(645 + horizontalOffset, 770 + verticalOffset), frameSize: new Vector2(10, 80), bgColor:color},
            // { position: new Vector2(715 + horizontalOffset, 745 + verticalOffset), frameSize: new Vector2(10, 35), bgColor:color},
            // { position: new Vector2(780 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(10, 120), bgColor:color},
            // { position: new Vector2(870 + horizontalOffset, 845 + verticalOffset), frameSize: new Vector2(10, 25), bgColor:color},
            // { position: new Vector2(1140 + horizontalOffset, 795 + verticalOffset), frameSize: new Vector2(10, 60), bgColor:color},
            // { position: new Vector2(1210 + horizontalOffset, 750 + verticalOffset), frameSize: new Vector2(10, 55), bgColor:color},
            // { position: new Vector2(1285 + horizontalOffset, 695 + verticalOffset), frameSize: new Vector2(10, 65), bgColor:color},
            // // // загружаем стены (правая вертикальная граница)
            // { position: new Vector2(1360 + horizontalOffset, 465 + verticalOffset), frameSize: new Vector2(10, 230), bgColor:color},
            // { position: new Vector2(1285 + horizontalOffset, 195+ verticalOffset), frameSize: new Vector2(10, 280), bgColor:color},
            // { position: new Vector2(1360 + horizontalOffset, 90 + verticalOffset), frameSize: new Vector2(10, 110), bgColor:color},
            // // // загружаем стены (правая горизонтальная граница)
            // { position: new Vector2(1290 + horizontalOffset, 465 + verticalOffset), frameSize: new Vector2(80, 10), bgColor:color},
            // { position: new Vector2(1285 + horizontalOffset, 190 + verticalOffset), frameSize: new Vector2(85, 10), bgColor:color},
        ];
    }
}