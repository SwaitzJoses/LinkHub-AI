/**
 * Emma Repository Model
 *
 * A Repository is the root container for a project.
 * Everything Emma knows belongs to a Repository.
 */

export const RepositoryStatus = {
  ACTIVE: "active",
  ARCHIVED: "archived",
};

export const createRepository = ({
  id,
  name,
  description = "",
  createdAt,
  updatedAt,
  status = RepositoryStatus.ACTIVE,
}) => ({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  status,
});