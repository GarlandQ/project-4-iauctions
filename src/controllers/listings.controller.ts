import { NextFunction, Response } from 'express';
import service from 'services/listings.service';
import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';
import { HttpException } from 'utils/util';

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

  // Get listing by id
  public getListById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listingId = Number(req.params.id);

    try {
      const findOneListData: Listing = await this.service.findListById(listingId);
      res.status(200).json({ data: findOneListData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  // Update listing
  public updateList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listingId = Number(req.params.id);
    const listingData: CreateListingDto = req.body;

    try {
      const checkUser = await this.service.findListById(listingId);

      // Check if the person updating is the owner of the listing
      if (req.user.id !== checkUser.userId) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const updateListingData: Listing = await this.service.updateList(listingId, listingData);
      res.status(200).json({ data: updateListingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // Delete listing
  public deleteList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listingId = Number(req.params.id);

    try {
      const checkUser = await this.service.findListById(listingId);

      // Check if the person updating is the owner of the listing
      if (req.user.id !== checkUser.userId) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const deleteListingData: Listing = await this.service.deleteList(listingId);
      res.status(204).json({ data: deleteListingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ListingsController;
