import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex
} from 'typeorm';

export class InvoiceTable1614275816426 implements MigrationInterface {
  indexFields = ['name', 'email', 'username'];
  tableName = 'invoices';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '100'
          },
          { name: 'status', type: 'varchar', default: `'active'` },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' }
        ]
      }),
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    await queryRunner.dropTable(this.tableName);
  }
}
