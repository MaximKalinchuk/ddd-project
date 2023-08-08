export enum EXCEPTION_USER_MESSAGES {
	USER_EMAIL_400 = 'Пользователь с такой почтой уже существует',
	USER_USERNAME_400 = 'Пользователь с таким ником уже существует',
	USER_NOT_FOUND_404 = 'Пользователь не найден',
	USER_UNAUTHORIZED_401 = 'Пользователь не авторизован',
	USER_PASSWORD_OR_EMAIL_WRONG = 'Неверный email или пароль',
	USER_CONFORMATION_UNAUTHORIZED_401 = 'Пожалуйста подтверждите ваш аккаунт. Сообщение для подтверждения было выслано на ваш email',
}

export enum EXCEPTION_EMAIL_MESSAGES {
	EMAIL_LINK_TIME_400 = 'Срок действия ссылки истёк',
	EMAIL_SEND_ERROR_400 = 'Не удалось отправить сообщение с подтверждением по электронной почте.',
	EMAIL_FEEDBACK_ERROR_400 = 'Не удалось отправить отзыв',
	EMAIL_ANTISPAM_ERROR_400 = 'Подождите 5 минут и повторите попытку',
}

export enum EXCEPTION_POST_MESSAGES {
	POST_NOT_FOUND_404 = 'Пост не найден',
}
