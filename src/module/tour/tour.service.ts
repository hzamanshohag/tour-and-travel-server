import { ITour } from './tour.interface';
import Tour from './tour.model';

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload);

  //   data.color = "red"

  const result = await data.save();
  return result;
};

const getTours = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const excludingImportant = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
  ];
  excludingImportant.forEach((key) => delete queryObj[key]);
  console.log({ query }, { queryObj });

  const searchTerm = query?.searchTerm || '';
  const searchableFields = ['name', 'startLocation', 'locations'];
  // {searchTerm=Base Camp}
  // const searchQuery = await Tour.find({
  //   $or: [
  //     { name: { $regex: searchTerm, $options: 'i' } },
  //     { startLocation: { $regex: searchTerm, $options: 'i' } },
  //     { locations: { $regex: searchTerm, $options: 'i' } },
  //   ],
  // });
  const searchableQuery = Tour.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  // const result = await searchQuery.find(queryObj);
  const filterQuery = searchableQuery.find(queryObj);

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  // skip = (page-1) * limit
  const skiped = (page - 1) * limit;
  const paginatedQuery = filterQuery.skip(skiped).limit(limit);

  let sortStr = '-price';

  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query?.sortBy;
    const sortOrder = query?.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }
  const result = await paginatedQuery.sort(sortStr);

  return result;
};

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id);
  return result;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload);
  return result;
};

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id);
  return result;
};

const getNextSchedule = async (id: string) => {
  console.log(id);
  const tour = await Tour.getNextNearestStartDateAndEndData();
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  };
};

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
