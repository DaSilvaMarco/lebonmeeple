import { JwtService } from '@nestjs/jwt';

export const meUser = async (request: Request, jwtService: JwtService) => {
  const authHeader = request.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return jwtService.decode(token);
};
