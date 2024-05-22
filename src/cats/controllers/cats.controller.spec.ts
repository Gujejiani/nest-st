import { ModuleRef } from '@nestjs/core';
import { CatsService } from '../services/cats.service';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [{
        name: 'Cat 1',
        age: 1,
        breed: 'Breed 1',
      
      }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});