import models from '../models/index.js';
const { ContentType } = models;

export const getTypes = async (req, res) => {
    try {
        const types = await ContentType.findAll({ order: [['createdAt', 'DESC']] });
        res.json(types);
    } catch (err) {
        console.error('/api/types error:', err);
        res.status(500).json({ error: 'Failed to load types' });
    }
};


export const createType = async (req, res) => {
  try {
    const { name } = req.body;
    const type = await models.ContentType.create({ name });
    res.status(201).json(type);
  } catch (err) {
    console.error('🔥 POST /api/type error:', err);
    res.status(500).json({ error: 'Failed to create type' });
  }
};

export const getTypeById = async (req, res) => {
  const type = await models.ContentType.findByPk(req.params.id);
  if (!type) return res.status(404).json({ error: 'Type not found' });
  res.json(type);
};

export const updateType = async (req, res) => {
  const type = await models.ContentType.findByPk(req.params.id);
  if (!type) return res.status(404).json({ error: 'Type not found' });

  type.name = req.body.name;
  await type.save();
  res.json(type);
};

export const deleteType = async (req, res) => {
  const type = await models.ContentType.findByPk(req.params.id);
  if (!type) return res.status(404).json({ error: 'Type not found' });

  const inUse = await models.Page.count({ where: { ContentTypeId: type.id } });
  if (inUse > 0) {
    return res.status(400).json({ error: 'Type is in use and cannot be deleted' });
  }

  await type.destroy();
  res.sendStatus(204);
};
