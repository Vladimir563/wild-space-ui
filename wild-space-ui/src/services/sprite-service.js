export class SpriteService {
    constructor({
        frameSize, // размер части изображения для отрисовки
        hFrames, // сколько изображений по горизонтали
        vFrames, // сколько изображений по вертикали
        frame, // часть которую хотим отрисовать
        scale // размер главного изображения
    }) {
        this.frameSize = frameSize ?? new Vector2(16, 16); // размеры одной картинки в спрайте
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;

        this.frameSize.x *= this.scale;
        this.frameSize.y *= this.scale;

        this.buildFrameMap();
    }

    getSprite() {
        return this;
    }

    // разбивка спрайта на кадры
    buildFrameMap() {
        let frameCount = 0;
        for(let v=0; v < this.vFrames; v++){
            for(let h=0; h < this.hFrames; h++){
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                );
                frameCount++;
            }
        }
    }

    makeWalkingFrames = (rootFrame = 0) => {
        return {
          frames: [
            {
              frame: rootFrame
            },
            {
              frame: rootFrame+1
            },
            {
              frame: rootFrame+2
            },
            {
              frame: rootFrame+3
            }
          ]
        }
      }
}

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}