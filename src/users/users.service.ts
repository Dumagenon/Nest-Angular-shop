import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async get(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(body: User): Promise<any> {
    const newUser = new this.userModel(body);
    return newUser.save();
  }

  async update(id, body: User): Promise<any> {
    return this.userModel.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
  }

  async delete(id): Promise<any> {
    return this.userModel.findByIdAndDelete(id);
  }
}
