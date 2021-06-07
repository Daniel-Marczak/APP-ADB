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
    public Role findFirstByName(String name) {
        return roleRepository.findFirstByName(name).orElse(null);
    }
}
