import { uuid } from "uuidv4"

export class User {
    public readonly id: string

    public name    : string
    public email   : string
    public password: string

    // quando for estanciado um novo user, o id nunca sera alterado (readonly), e sera omitido pelo constructor
    constructor(props: Omit<User, 'id'>, id?: string){
        // tudo que estiver dentro do this e do props ele set o val para cada index
        Object.assign(this, props)

        if(!id){
            this.id = uuid()
        }
    }
}