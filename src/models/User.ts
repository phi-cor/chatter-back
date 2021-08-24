import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'user'})
export default class User {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({type :"varchar",width : 250})
    email!:string;
    @Column({type :"varchar",width : 250})
    name!:string;
    @Column({type :"varchar",width : 250})
    photo!:string;
    
    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;

    constructor(email:string,name:string,photo:string)
    {
     this.email=email
     this.name=name
     this.photo=photo
    }
    
}
