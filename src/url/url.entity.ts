import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("url")
export class URLEntity extends BaseEntity {

    @PrimaryColumn("varchar", { length: 10 })
    shortUrl: string;

    @Column("text")
    longUrl: string;

    @CreateDateColumn()
    creationDate: Date;
}