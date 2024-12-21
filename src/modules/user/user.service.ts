import { Injectable } from '@nestjs/common'
import { usersData } from 'src/mocks'

@Injectable()
export class UserService {
	getUsers() {
		return usersData
	}
}
