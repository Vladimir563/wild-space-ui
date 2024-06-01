export class EngineService {

    checkCollision = (newPostion, characterFrameSize, characterSpeed, objects) => {
        const characterRect = {
          x: newPostion.x,
          y: newPostion.y,
          width: characterFrameSize.x,
          height: characterFrameSize.y,
          speed: characterSpeed
        };
    
        return objects.some((obj) => {    
          const objectRect = {
            x: obj.position.x,
            y: obj.position.y,
            width: obj.frameSize.x,
            height: obj.frameSize.y,
          };
    
          return this.isColliding(characterRect, objectRect);
        });
      };
    
    isColliding = (characterRect, objectRect) => {
        return (
            characterRect.x + characterRect.speed*2.5 <= objectRect.x + objectRect.width &&
            characterRect.x + characterRect.width >= objectRect.x + characterRect.speed*2.5 &&
            characterRect.y + characterRect.height - (characterRect.speed*2) <= objectRect.y + objectRect.height &&
            characterRect.y + characterRect.height >= objectRect.y + characterRect.speed
        );
    };

    couldInteractWith = (heroSprite, position, obj) => {
        const interaction_radius = obj.frameSize.x + obj.frameSize.x / 2;
        const objectCenterX = obj.position.x + obj.frameSize.x / 2;
        const objectCenterY = obj.position.y + obj.frameSize.y / 2;
        const playerCenterX = position.x + heroSprite.frameSize.x / 2;
        const playerCenterY = position.y + heroSprite.frameSize.y / 2;
  
        const distance = Math.sqrt(
          Math.pow(objectCenterX - playerCenterX, 2) +
          Math.pow(objectCenterY - playerCenterY, 2)
        );
     
        if (distance <= interaction_radius) {
          return true;
        }

        return false;
      };

    getAllInteractableObjects(heroSprite, position, objects){
      let objectsForInteraction = new Map();
      objects.forEach(obj => {
        if(this.couldInteractWith(heroSprite, position, obj)){
          objectsForInteraction.set(obj.name, true);
        }
      });

      return objectsForInteraction;
    }
}