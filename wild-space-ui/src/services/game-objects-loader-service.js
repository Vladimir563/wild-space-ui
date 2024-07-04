import { Vector2 } from '../services/sprite-service';

export class GameObjectsLoaderService {
    loadGameObjects = () => {
        const objs = [
            { id: 0, position: new Vector2(200,70), frameSize: new Vector2(70, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 0.5, name: "Computer", isInteractable: true },
            { id: 0, position: new Vector2(150, 30), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 0.7, animationInterval: 80, name: "ClrPet", isInteractable: true }
        ];

        let id = 100;
        return objs.map(obj => {      
            obj.id = id++;
            return obj;
        });
    }

    loadGroundWalls = () => {
        const color = "";
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
            // загружаем стены (верхняя горизонтальная граница)
            { position: new Vector2(84, 2), frameSize: new Vector2(240, 10), scale:0.5, bgColor:color},
            { position: new Vector2(143, 7), frameSize: new Vector2(157, 10), scale:0.5, bgColor:color},
            { position: new Vector2(182, 0), frameSize: new Vector2(280, 10), scale:0.5, bgColor:color},
            { position: new Vector2(252, 10), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            // загружаем стены (верхняя вертикальная граница)
            { position: new Vector2(142, 2), frameSize: new Vector2(10, 30), scale:0.5, bgColor:color},
            { position: new Vector2(180, 0), frameSize: new Vector2(10, 40), scale:0.5, bgColor:color},
            { position: new Vector2(250, 0), frameSize: new Vector2(10, 50), scale:0.5, bgColor:color},
            // загружаем стены (нижняя горизонтальная граница)
            { position: new Vector2(81, 183), frameSize: new Vector2(90, 10), scale:0.5, bgColor:color},
            { position: new Vector2(217, 173), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            { position: new Vector2(251, 150), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            { position: new Vector2(234, 161), frameSize: new Vector2(70, 10), scale:0.5, bgColor:color},
            { position: new Vector2(156, 185), frameSize: new Vector2(250, 10), scale:0.5, bgColor:color},
            { position: new Vector2(137, 188), frameSize: new Vector2(75, 10), scale:0.5, bgColor:color},
            { position: new Vector2(120, 161), frameSize: new Vector2(65, 10), scale:0.5, bgColor:color},
            { position: new Vector2(103, 167), frameSize: new Vector2(73, 10), scale:0.5, bgColor:color},
            // загружаем стены (нижняя вертикальная граница)
            { position: new Vector2(103, 170), frameSize: new Vector2(10, 65), scale:0.5, bgColor:color},
            { position: new Vector2(119, 161), frameSize: new Vector2(10, 35), scale:0.5, bgColor:color},
            { position: new Vector2(134, 161), frameSize: new Vector2(10, 120), scale:0.5, bgColor:color},
            { position: new Vector2(153, 185), frameSize: new Vector2(10, 25), scale:0.5, bgColor:color},
            { position: new Vector2(217, 174), frameSize: new Vector2(10, 55), scale:0.5, bgColor:color},
            { position: new Vector2(234, 162), frameSize: new Vector2(10, 55), scale:0.5, bgColor:color},
            { position: new Vector2(250, 150), frameSize: new Vector2(10, 57), scale:0.5, bgColor:color},
            // загружаем стены (правая вертикальная граница)
            { position: new Vector2(268, 95), frameSize: new Vector2(10, 230), scale:0.5, bgColor:color},
            { position: new Vector2(251, 35), frameSize: new Vector2(10, 250), scale:0.5, bgColor:color},
            { position: new Vector2(268, 10), frameSize: new Vector2(10, 100), scale:0.5, bgColor:color},
            // загружаем стены (правая горизонтальная граница)
            { position: new Vector2(251, 34), frameSize: new Vector2(80, 10), scale:0.5, bgColor:color},
            { position: new Vector2(251, 95), frameSize: new Vector2(80, 10), scale:0.5, bgColor:color},
        ];
    }
}