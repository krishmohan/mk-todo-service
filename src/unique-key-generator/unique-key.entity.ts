import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("unique_key")
export class UniqueKeyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 6 })
    uniqueKey: string;

    @Column("boolean", { default: true })
    available: boolean;

    @CreateDateColumn()
    creationDate: Date;
}