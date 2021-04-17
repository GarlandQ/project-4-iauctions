import { NextFunction, Response } from 'express';
import service from 'services/listings.service';
import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';
import { HttpException } from 'utils/util';
import CreateCommentDto from 'dtos/comments.dtos';
import CreateBidDto from 'dtos/bids.dtos';

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

  // Create comment
  public createComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listingId = Number(req.params.id);
    const data: CreateCommentDto = req.body;

    try {
      const createOne = await this.service.createComment(listingId, data, req.user);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // Create bid
  public createBid = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listingId = Number(req.params.id);
    const data: CreateBidDto = req.body;
    // Getting listing to compare price and bid
    const listing: Listing = await this.service.findListById(listingId);

    try {
      // Check if bid amount is higher than listing price and replace price if so
      if (data.amount > listing.price) {
        const createOne = await this.service.createBid(listingId, data, req.user);
        res.status(201).json({ data: createOne, message: 'created' });
        // Update listing price to bid amount
        listing.price = data.amount;
        await listing.save();
      } else {
        next(new HttpException(403, 'Bid amount less than price. Rejected. '));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ListingsController;
