import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'marcos',
    required: true,
  })
  name: string;
  @ApiProperty({
    example: 'marcoslima@gmail.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    example: 'xxxxxxxxxxx',
    required: true,
  })
  password: string;
}
