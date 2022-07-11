import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { Bag } from '../models';

export const list = async (req: Request, res: Response): Promise<Response> => {
  const ids = (req.query.ids || []) as Id[];

  const queryBuilder = Bag.query().withGraphFetched('cuboids');
  const bags = ids.length
    ? await queryBuilder.findByIds(ids)
    : await queryBuilder;

  return res.status(200).json(bags);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  const bag = await Bag.query().findById(id).withGraphFetched('cuboids');

  if (!bag) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.status(200).json(bag);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { volume, title } = req.body;
  const bag = await Bag.query().insert({ volume, title });

  return res.status(HttpStatus.CREATED).json(bag);
};
