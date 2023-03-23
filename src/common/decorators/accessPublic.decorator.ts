import { SetMetadata } from '@nestjs/common';

export const AtPublic = () => SetMetadata('isPublic', true);
