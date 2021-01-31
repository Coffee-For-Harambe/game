export default class CharacterDefinition {
    constuctor (name, hp, damage, movement, attackRange, damageResist, initiative, pointValue){
        this.name = name
        this.hp = hp
        this.damage = damage
        this.movement = movement
        this.attackRange = attackRange
        this.damageResist = damageResist
        this.initiative = initiative
        this.pointValue = pointValue
    }

    receiveDamage (damage){
            this.hp -= (damage - (damage *this.damageResist))
    }

    moveSprite (){
        /*https://stackoverflow.com/questions/27532099/moving-chess-pieces-in-native-javascript*/
    }
}
