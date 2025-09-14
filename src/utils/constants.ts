export const NOT_FOUND_CARD_DATA_ERROR = 'Карточка с указанным id не найдена';
export const NOT_FOUND_USER_DATA_ERROR = 'Пользователь с указанным id не найден';
export const VALIDATION_USER_DATA_ERROR = 'Переданы некорректные данные при создании пользователя';
export const VALIDATION_USER_PROFILE_DATA_ERROR = 'Переданы некорректные данные при обновлении профиля';
export const VALIDATION_USER_AVATAR_DATA_ERROR = 'Переданы некорректные данные при обновлении аватара';
export const VALIDATION_CARD_DATA_ERROR = 'Переданы некорректные данные при создании карточки';
export const SERVER_ERROR = 'На сервере произошла ошибка';
export const DUPLICATE_USER_ERROR = 'Пользователь с указанным параметром уже существует: ';
export const DUPLICATE_CARD_ERROR = 'Карточка с указанным параметром уже существует: ';
export const INCORRECT_DATA_ERROR = 'Неверный формат данных';
export const INCORRECT_LIKE_DATA_ERROR = 'Переданы некорректные данные для установки лайка';
export const INCORRECT_AUTH_DATA_ERROR = 'Переданы неправильные почта или пароль';
export const UNAUTHORIZED_ERROR = 'Необходима авторизация';
export const DEV_JWT_SECRET = 'dev-secret';

export const HTTP_STATUS = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  InternalServerError: 500,
} as const;
