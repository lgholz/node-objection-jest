import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { Bag, Cuboid } from '../models';

export const list = async (req: Request, res: Response): Promise<Response> => {
  const ids = (req.query.ids || []) as Id[];

  const queryBuilder = Cuboid.query().withGraphFetched('bag');
  const cuboids = ids.length
    ? await queryBuilder.findByIds(ids)
    : await queryBuilder;

  return res.status(200).json(cuboids);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  const cuboid = await Cuboid.query().findById(id).withGraphFetched('bag');

  if (!cuboid) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.status(HttpStatus.OK).json(cuboid);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { width, height, depth, bagId } = req.body;

  const bag = await Bag.query().findById(bagId).withGraphFetched('cuboids');

  if (!bag) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  if (bag.availableVolume < width * height * depth) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: 'Insufficient capacity in bag' });
  }

  const cuboid = await Cuboid.query().insert({
    width,
    height,
    depth,
    bagId,
  });

  return res.status(HttpStatus.CREATED).json(cuboid);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  const { width, height, depth } = req.body;

  const cuboid = await Cuboid.query().findById(id).withGraphFetched('bag');
  if (!cuboid) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  // save volume for compare later
  const volume = cuboid.volume;

  cuboid.width = width;
  cuboid.height = height;
  cuboid.depth = depth;

  // get bag and check new volume space
  const bag = await Bag.query()
    .findById(cuboid.bag.id)
    .withGraphFetched('cuboids');

  if (!bag) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  const diff = cuboid.volume - volume;
  if (bag?.availableVolume < diff) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: 'Insufficient capacity in bag' });
  }

  // update database
  const updatedCuboid = await Cuboid.query().updateAndFetchById(cuboid.id, {
    width,
    height,
    depth,
  });

  return res.status(HttpStatus.OK).json({ ...updatedCuboid, bag: bag });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;

  const deletedCount = await Cuboid.query().deleteById(id);
  if (deletedCount === 0) {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.sendStatus(HttpStatus.OK);
};
