import { Id, RelationMappings } from 'objection';
import { Cuboid } from './Cuboid';
import Base from './Base';

export class Bag extends Base {
  id!: Id;
  volume!: number;
  title!: string;
  cuboids?: Cuboid[] | undefined;

  static tableName = 'bags';

  static get relationMappings(): RelationMappings {
    return {
      cuboids: {
        relation: Base.HasManyRelation,
        modelClass: Cuboid,
        join: {
          from: 'bags.id',
          to: 'cuboids.bagId',
        },
      },
    };
  }

  static get virtualAttributes(): string[] {
    return ['payloadVolume', 'availableVolume'];
  }

  get payloadVolume(): number {
    if (this.cuboids) {
      return this.cuboids.reduce(
        (sum: number, cur: Cuboid) => cur.volume + sum,
        0
      );
    }

    return 0;
  }

  get availableVolume(): number {
    return this.volume - this.payloadVolume;
  }
}
