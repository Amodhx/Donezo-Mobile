class UserModel{
    user_id:string
    full_name:string
    email:string
    password:string

    constructor(user_id: string, full_name: string, email: string, password: string) {
        this.user_id = user_id;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
    }
}
export default UserModel;