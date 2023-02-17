export interface IConfirmation {
	id: number;
	confirmationCode: string;
	isConfirmed: boolean;
	userId: number;
}
