import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordRecoveryUseCase {
	async execute(confirmationCode: string): Promise<void> {}
}
