import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { MailTrapProviders } from "../../providers/implementations/MailTrapProviders";
import { CreateUser } from "./CreateUser";
import { CreateUserController } from "./CreateUserController";

const postgresUsersRepository = new PostgresUsersRepository()
const mailTrapProviders       = new MailTrapProviders()

const createUsersUseCase = new CreateUser(
    postgresUsersRepository,
    mailTrapProviders
)

const createUserController = new CreateUserController(
    createUsersUseCase
)

export { CreateUser, createUserController }