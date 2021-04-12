import { NextFunction, Response } from 'express';
import service from 'services/listings.service';
import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';

class ListingsController {
  public service = new service();

  public list = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Listing[] = await this.service.list();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data: CreateListingDto = req.body;

    try {
      const createOne = await this.service.create(data, req.user);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ListingsController;
