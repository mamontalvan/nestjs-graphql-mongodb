import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ){}

    async createStudent(createLessonInput:CreateStudentInput): Promise<Student>{
        const { firstName, lastName } = createLessonInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
        });

        return await this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]>{
        return await this.studentRepository.find()
    }

    async getStudent(id: string): Promise<Student> {
        return await this.studentRepository.findOne({ where: { id } });
    }

    async getManyStudents(studentsIds: string[]): Promise<Student[]>{
        return this.studentRepository.find({
            where: {
                id: In(studentsIds)
            }
        });
    }
}
