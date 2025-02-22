import React from "react";

const categories = [
  {
    name: "Electronics",
    value: "Electronics",
  },
  {
    name: "Home",
    value: "Home",
  },
  {
    name: "Fashion",
    value: "Fashion",
  },
  {
    name: "Sports",
    value: "Sports",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years",
    value: "12-20",
  },
];
function Filter({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-80 flex flex-col">
      <div className="flex justify-between text-xl">
        <h1 className="text-orange-500 text-xl">Filters</h1>
        <i
          className="ri-close-line text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600 ">Categories</h1>
        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600 ">Ages</h1>
        <div className="flex flex-col">
          {ages.map((age) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="age"
                  className="max-width"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filter;
