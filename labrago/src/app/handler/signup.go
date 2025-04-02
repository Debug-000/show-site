package handler

import (
	"app/domain/svc"
	"app/ent"
	"encoding/json"
	"io"
	"net/http"

	"github.com/GoLabra/labrago/src/api/constants"
	"golang.org/x/crypto/bcrypt"
)

type SignupFormData struct {
	Email       string   `json:"email"`
	Password    string   `json:"password"`
	FirstName   string   `json:"firstName"`
	LastName    string   `json:"lastName"`
	Roles       []string `json:"roles"`
	DefaultRole string   `json:"defaultRole"`
}

// TODO @David: 1. sanitize error messages; 2. move to api; 3. add logs;
func Signup(w http.ResponseWriter, r *http.Request) {
	var (
		signupFormData SignupFormData
	)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	err = json.Unmarshal(body, &signupFormData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	service, ok := r.Context().Value(constants.ServiceContextValue).(*svc.Service)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(signupFormData.Password), 14)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var rolesConnect = []*ent.RoleWhereUniqueInput{}

	for _, role := range signupFormData.Roles {
		rolesConnect = append(rolesConnect, &ent.RoleWhereUniqueInput{
			Name: &role,
		})
	}

	user, err := service.User.Create(r.Context(), ent.CreateUserInput{
		Email:     signupFormData.Email,
		Password:  string(hashedPassword),
		FirstName: signupFormData.FirstName,
		LastName:  signupFormData.LastName,
		Roles: &ent.CreateManyRoleInput{
			Connect: rolesConnect,
		},
		DefaultRole: &ent.CreateOneRoleInput{
			Connect: &ent.RoleWhereUniqueInput{
				Name: &signupFormData.DefaultRole,
			},
		},
	})

	if err != nil || user == nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
