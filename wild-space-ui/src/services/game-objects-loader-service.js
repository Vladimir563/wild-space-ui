import { Vector2 } from '../services/sprite-service';

export class GameObjectsLoaderService {
    loadGameObjects = () => {
        return [
            { position: new Vector2(850, 250), frameSize: new Vector2(70, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 1, name: "Computer" },
            { position: new Vector2(650, 200), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 1, animationInterval: 80, enableAnimation: false, name: "ClrPet" }
        ];
    }

    loadGroundWalls = () => {
        const color = "green";
        return [
            // загружаем стены (левая вертикальная граница)
            { position: new Vector2(680, 380), frameSize: new Vector2(10, 90), bgColor:color},
            { position: new Vector2(590, 95), frameSize: new Vector2(10, 290), bgColor:color},
            { position: new Vector2(620, 470), frameSize: new Vector2(10, 110), bgColor:color},
            { position: new Vector2(550, 580), frameSize: new Vector2(10, 170), bgColor:color},
            { position: new Vector2(580, 750), frameSize: new Vector2(10, 65), bgColor:color},
            // загружаем стены (левая горизонтальная граница)
            { position: new Vector2(590, 380), frameSize: new Vector2(90, 10), bgColor:color},
            { position: new Vector2(550, 570), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(620, 460), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(550, 750), frameSize: new Vector2(40, 10), bgColor:color},
            // загружаем стены (верхняя горизонтальная граница)
            { position: new Vector2(590, 85), frameSize: new Vector2(235, 10), bgColor:color},
            { position: new Vector2(825, 110), frameSize: new Vector2(160, 10), bgColor:color},
            { position: new Vector2(985, 75), frameSize: new Vector2(280, 10), bgColor:color},
            { position: new Vector2(1265, 120), frameSize: new Vector2(70, 10), bgColor:color},
            // загружаем стены (верхняя вертикальная граница)
            { position: new Vector2(825, 85), frameSize: new Vector2(10, 30), bgColor:color},
            { position: new Vector2(975, 75), frameSize: new Vector2(10, 40), bgColor:color},
            { position: new Vector2(1265, 75), frameSize: new Vector2(10, 50), bgColor:color},
            // загружаем стены (нижняя горизонтальная граница)
            { position: new Vector2(580, 815), frameSize: new Vector2(95, 10), bgColor:color},
            { position: new Vector2(665, 750), frameSize: new Vector2(70, 10), bgColor:color},
            { position: new Vector2(735, 725), frameSize: new Vector2(65, 10), bgColor:color},
            { position: new Vector2(800, 835), frameSize: new Vector2(80, 10), bgColor:color},
            { position: new Vector2(870, 820), frameSize: new Vector2(265, 10), bgColor:color},
            { position: new Vector2(1125, 775), frameSize: new Vector2(80, 10), bgColor:color},
            { position: new Vector2(1195, 725), frameSize: new Vector2(75, 10), bgColor:color},
            { position: new Vector2(1265, 680), frameSize: new Vector2(75, 10), bgColor:color},
            // загружаем стены (нижняя вертикальная граница)
            { position: new Vector2(665, 750), frameSize: new Vector2(10, 70), bgColor:color},
            { position: new Vector2(735, 730), frameSize: new Vector2(10, 30), bgColor:color},
            { position: new Vector2(790, 725), frameSize: new Vector2(10, 120), bgColor:color},
            { position: new Vector2(870, 820), frameSize: new Vector2(10, 25), bgColor:color},
            { position: new Vector2(1125, 775), frameSize: new Vector2(10, 55), bgColor:color},
            { position: new Vector2(1195, 725), frameSize: new Vector2(10, 55), bgColor:color},
            { position: new Vector2(1260, 680), frameSize: new Vector2(10, 55), bgColor:color},
            // загружаем стены (правая вертикальная граница)
            { position: new Vector2(1330, 465), frameSize: new Vector2(10, 220), bgColor:color},
            { position: new Vector2(1265, 215), frameSize: new Vector2(10, 260), bgColor:color},
            { position: new Vector2(1335, 120), frameSize: new Vector2(10, 105), bgColor:color},
            // загружаем стены (правая горизонтальная граница)
            { position: new Vector2(1270, 465), frameSize: new Vector2(60, 10), bgColor:color},
            { position: new Vector2(1270, 215), frameSize: new Vector2(70, 10), bgColor:color},
        ];
    }
}