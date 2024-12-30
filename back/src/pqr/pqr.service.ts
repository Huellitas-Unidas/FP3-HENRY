import { HttpException, Injectable } from '@nestjs/common';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PqrService {
  constructor(
    private readonly prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(createPqrDto: CreatePqrDto) {
    const { fullname, email, type, description, userId } = createPqrDto;

    const userFound = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userFound) throw new HttpException('usuario no encontrado', 404);

    const pqr = await this.prisma.pqr.create({
      data: { fullname, email, type, description, userId },
    });

    await this.emailService.sendMail(
      userFound.email,
      'Confirmación de PQR recibido',
      `Hola ${userFound.name},\n\nHemos recibido tu ${type} con éxito. A continuación te compartimos los detalles:\n\nTipo: ${type}\nDescripción: ${description}\n\nNuestro equipo está trabajando en ello y te responderá lo antes posible.\n\nGracias por contactarnos.\n\nSaludos,\nEl equipo de Huellas Unidas`,
    );

    return pqr;
  }

  async findAll() {
    return this.prisma.pqr.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const pqr = await this.prisma.pqr.findUnique({ where: { id } });
    if (!pqr) throw new HttpException(`PQR con ID ${id} no encontrado `, 404);
    return pqr;
  }

  async update(id: number, updatePqrDto: UpdatePqrDto) {}

  async remove(id: string) {
    const pqr = await this.prisma.pqr.findUnique({ where: { id } });
    if (!pqr) throw new HttpException(`PQR con ID ${id} no encontrado `, 404);

    await this.prisma.pqr.delete({ where: { id } });
    return { message: `PQR con ID ${id} eliminado correctamente` };
  }
}
