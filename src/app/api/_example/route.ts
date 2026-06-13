// Template route handler — copy, rename folder, wire to real backend.
// Real pattern: import { request } from '@/api/axios'; return Response.json((await request.get('/your-path', { params })).data);

const MOCK_DELAY = 600;

const mockDelay = (ms = MOCK_DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_DATA = [
  { id: 1, name: 'Item One', description: 'First item', status: 'active', createdAt: new Date().toISOString() },
  { id: 2, name: 'Item Two', description: 'Second item', status: 'inactive', createdAt: new Date().toISOString() },
];

export const GET = async (req: Request) => {
  try {
    await mockDelay();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 10);

    return Response.json({
      data: MOCK_DATA,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: MOCK_DATA.length,
        totalPages: 1,
        itemCount: MOCK_DATA.length,
      },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await mockDelay();
    const body = await req.json();
    const newItem = { id: Date.now(), ...body, createdAt: new Date().toISOString() };

    return Response.json({ data: newItem, meta: { code: 201, message: 'Created' } }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    await mockDelay();
    const body = await req.json();

    return Response.json({ data: body, meta: { code: 200, message: 'Updated' } });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    await mockDelay();
    const body = await req.json();

    return Response.json({ data: body, meta: { code: 200, message: 'Patched' } });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
