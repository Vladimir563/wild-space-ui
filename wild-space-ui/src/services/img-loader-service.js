import ClrPet from '../assets/clr-pet/Idle.png';

export class ImgLoaderService {
    constructor() {
        this.gameObjectImages = new Map();
    }

    loadGameObjectImages(){
        this.gameObjectImages.set("ClrPet", ClrPet);

        return this.gameObjectImages;
    }
}