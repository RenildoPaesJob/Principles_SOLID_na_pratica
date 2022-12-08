import { User } from "../../entities/User";
import { IMailProviders } from "../../providers/IMailProviders";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

// classe para ciração de um user => Single Responsibility Principle
export class CreateUser {

    constructor(
        // Liskov Substitution Principle
        // ações que cada user poderá fazer definidos na Interface IUsersRepository
        private usersRepository: IUsersRepository,
        // Dependency Inversion Principle
        // aqui esta dependendo de outra class para faz a implementação com o banco de dados seja la qual for ele

        private mailProvider: IMailProviders
    ){}

    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists)
            throw new Error(`User ${data.email} already exists`)

        const user = new User(data)

        await this.usersRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: data.name,
                email: data.email,
            },
            subject: `${data.name} Seja bem-vindo à plataforma`,
            body: `<p>${data.name}, você já pode fazer o login em nossa plataforma!</p>`
        })
    }
}