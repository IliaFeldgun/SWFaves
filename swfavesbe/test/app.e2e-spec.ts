import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
  it('/characters (GET)', () => {
    return request(app.getHttpServer())
      .get('/characters')
      .expect(200);
  });
  it('/characters (POST)', () => {
    return request(app.getHttpServer())
      .post('/characters').send({_id: 1234567, characters: ["Sky", "Walker"]})
      .expect(201);
  });
  it('/suggestedfilms/userID (GET)', () => {
    let userID = 609074512;
    return request(app.getHttpServer())
      .get('/suggestedfilms/' + userID)
      .expect(200);
  });
});
