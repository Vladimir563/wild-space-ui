import ClrPet from '../assets/clr-pet/Idle.png';
import Computer from '../assets/environment/computer.png';

export class ImgLoaderService {
    constructor() {
        this.gameObjectImages = new Map();
    }

    loadGameObjectImages(){
        this.gameObjectImages.set("ClrPet", ClrPet);
        this.gameObjectImages.set("Computer", Computer);

        return this.gameObjectImages;
    }
}