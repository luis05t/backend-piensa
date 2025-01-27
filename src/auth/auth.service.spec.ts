import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/*import { validate } from 'class-validator';
import { CreateLoginDto } from './dto/createLogin.dto'; 

describe('CreateLoginDto', () => {
  it.only('should validate a valid user DTO', async () => {
    const dto = new CreateLoginDto();
    dto.email = "alluis2005@gmail.com"
    dto.password = "luis123"
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });         
it.only('should invalidate an incorrect email', async () => {
  const dto = new CreateLoginDto();
  dto.email = "alluis2005gmail.com";
  dto.password = "luis123"
  const errors = await validate(dto);
  expect(errors.length).toBeGreaterThan(0);
  expect(errors[0].constraints).toHaveProperty('isEmail');
});
it.only('should invalidate an empty password', async () => {
  const dto = new CreateLoginDto();
  dto.email = "alluis2005@gmail.com";
  dto.password = ""
  const errors = await validate(dto);
  expect(errors.length).toBeGreaterThan(0);
  expect(errors[0].constraints).toHaveProperty('isNotEmpty');
});
});
*/