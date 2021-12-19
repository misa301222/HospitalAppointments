export interface Roles {
    administrator?: boolean;
    user?: boolean;
    doctor?: boolean;
}

export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles: Roles;
}