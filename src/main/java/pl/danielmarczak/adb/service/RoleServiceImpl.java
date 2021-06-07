package pl.danielmarczak.adb.service;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Role;
import pl.danielmarczak.adb.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findRoleById(Integer id) {
        return roleRepository.findRoleById(id).orElse(new Role());
    }
}
