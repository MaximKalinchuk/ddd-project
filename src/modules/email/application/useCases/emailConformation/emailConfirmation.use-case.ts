import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfirmationRepository } from '../../../infrastructure/confirmations.repository';

@Injectable()
export class EmailConfirmationUseCase {
	constructor(private readonly confirmationRepository: ConfirmationRepository) {}

	async execute(confirmationCode: string): Promise<void> {
		const confirmation = await this.confirmationRepository.findOne({
			where: {
				confirmationCode,
			},
		});

		if (!confirmation) {
			throw new HttpException('The link has expired.', HttpStatus.BAD_REQUEST);
		}

		confirmation.confirmationCode = '';
		confirmation.isConfirmed = true;
		await this.confirmationRepository.save(confirmation);
	}
}
