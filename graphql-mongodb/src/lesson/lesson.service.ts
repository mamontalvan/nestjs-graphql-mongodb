import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from 'src/student/assign-students-lesson.input';
import { Student } from 'src/student/student.entity';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) {}

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;        
        const lesson = this.lessonRepository.create({            
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return await this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson> {
        return await this.lessonRepository.findOne({ where: { id } });
    }

    async getLessons(): Promise<Lesson[]> {
        return await this.lessonRepository.find();
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson>{
        const { lessonId, studentsIds } = assignStudentsToLessonInput;
        const lesson = await this.getLesson(lessonId);
        lesson.students = [...lesson.students, ...studentsIds]

        return await this.lessonRepository.save(lesson)
    }
}
