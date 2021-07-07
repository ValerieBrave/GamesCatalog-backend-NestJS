import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    //user as entity

    findByToken(token: string) {
        return this.createQueryBuilder('user')
                    .leftJoinAndSelect('user.games', 'game')
                    .where('user.token = :token', { token: token })
                    .getOne();
    }
    findByEmail(email: string) {
        return this.createQueryBuilder('user')
                    .where('user.email = :email', { email: email })
                    .getOne();
    }
    
    setNewToken(userId: number, newToken: string) {
        return this.createQueryBuilder('user')
                    .update(User)
                    .set({ token: newToken })
                    .where('id = :id', { id: userId })
                    .execute();
    }

    //user as profile

    getProfileInfo(token: string) {
        return this.createQueryBuilder()
                    .select(['user.id', 'user.avatar', 'user.name', 'user.email', 'user.birthday'])
                    .from(User, 'user')
                    .where('user.token = :token', { token: token })
                    .getOne();
    }

    updatePassword(userId: number, newPass: string) {
        return this.createQueryBuilder()
                    .update(User)
                    .set({ password: newPass })
                    .where('id = :id', { id: userId })
                    .execute();
    }

    updateName(userId: number, newName: string) {
        return this.createQueryBuilder()
                    .update(User)
                    .set({ name: newName })
                    .where('id = :id', { id: userId })
                    .execute();
    }
    
    updateBirthday(userId: number, newBD: string) {
        //format yyyy-mm-dd
        return this.createQueryBuilder()
                    .update(User)
                    .set({ birthday: newBD })
                    .where('id = :id', { id: userId })
                    .execute();
    }
    
    updateAvatar(userId: number, link: string) {
        return this.createQueryBuilder()
                    .update(User)
                    .set({ avatar: link })
                    .where('id = :id', { id: userId })
                    .execute();
    }
}