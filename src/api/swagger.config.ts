import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwaggerOptions(
  title: string,
  description: string,
  version: string,
  tag: string,
) {
  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag(tag)
    .build();
}

export function setupSwagger(app) {
  const modules = [
    { title: 'API Clientes', description: '', version: '1.0', tag: 'clientes' },
    { title: 'API Managers', description: '', version: '1.0', tag: 'managers' },
    {
      title: 'API Parceiros',
      description: '',
      version: '1.0',
      tag: 'parceiros',
    },
  ];

  const documents = modules.map((module) =>
    SwaggerModule.createDocument(
      app,
      createSwaggerOptions(
        module.title,
        module.description,
        module.version,
        module.tag,
      ),
    ),
  );

  const mergedDocument = {
    openapi: '3.0.0',
    info: {
      title: 'Itanet API',
      description: '',
      version: '1.0',
    },
    paths: Object.assign({}, ...documents.map((doc) => doc.paths)),
    tags: [].concat(...documents.map((doc) => doc.tags)),
  };

  SwaggerModule.setup('api', app, mergedDocument);
}
